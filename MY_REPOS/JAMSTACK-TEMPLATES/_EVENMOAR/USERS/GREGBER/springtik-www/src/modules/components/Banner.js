import React, {PropTypes} from 'react';
import styles from './styles/banner.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames/bind';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const cx = classNames.bind(styles);

const Banner = ({
  uiStyle,
  show,
  className: propClassName,
  children,
  ...props,
}) => {
  const uiStyleClassName = uiStyle ? `banner-${uiStyle}` : null;
  const className = cx('banner', 'foo', uiStyleClassName, propClassName);

  return (
    <ReactCSSTransitionGroup
      transitionName="bannerFromTop"
      transitionEnterTimeout={250}
      transitionLeaveTimeout={500}
    >
      {show ? (
        <div key="banner" {...{...props, className}}>
          {children}
        </div>
      ) : null}
    </ReactCSSTransitionGroup>
  );
};

Banner.propTypes = {
  show: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  uiStyle: PropTypes.oneOf([
    'info',
    'danger',
    'warning',
    'success',
  ]),
};

export default withStyles(styles)(Banner);
