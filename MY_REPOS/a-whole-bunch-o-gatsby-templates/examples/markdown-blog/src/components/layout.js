import React from 'react';
import PropTypes from 'prop-types';

import './layout.css';

const Layout = ({ children }) => (
  <>
    <main className="layout">{children}</main>
    <footer style={{ textAlign: 'center', padding: '3rem 0' }}>
      &copy; 2018 by John Doe. All rights reserved.
    </footer>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
