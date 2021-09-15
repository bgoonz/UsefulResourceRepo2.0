import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// UI.
import SkipLink from '../components/SkipLink';

// Layout.
import AppLayoutFooter from './AppLayoutFooter';
import AppLayoutHeader from './AppLayoutHeader';
import AppLayoutMain from './AppLayoutMain';

// ==========
// Constants.
// ==========

const REGEX_FOOTER = /^footer[A-Z]/;
const REGEX_HEADER = /^header[A-Z]/;
const REGEX_MAIN = /^main[A-Z]/;

// ==========
// Component.
// ==========

const AppLayout = ({
  // Layout props.
  children = null,
  className = null,
  style = null,

  // Other props.
  ...otherProps
}) => {
  // =================
  // Build class list.
  // =================

  const classList = cx({
    'app-layout': true,
    [String(className)]: className,
  });

  // ===================
  // Get specific props.
  // ===================

  const footerProps = {};
  const headerProps = {};
  const mainProps = {};

  for (const key in otherProps) {
    if (key.match(REGEX_FOOTER)) {
      footerProps[key] = otherProps[key];
    }

    if (key.match(REGEX_HEADER)) {
      headerProps[key] = otherProps[key];
    }

    if (key.match(REGEX_MAIN)) {
      mainProps[key] = otherProps[key];
    }
  }

  // ==========
  // Expose UI.
  // ==========

  return (
    <>
      <SkipLink />

      <div className={classList} style={style}>
        <AppLayoutHeader {...headerProps} />

        <AppLayoutMain {...mainProps}>{children}</AppLayoutMain>

        <AppLayoutFooter {...footerProps} />
      </div>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default AppLayout;
