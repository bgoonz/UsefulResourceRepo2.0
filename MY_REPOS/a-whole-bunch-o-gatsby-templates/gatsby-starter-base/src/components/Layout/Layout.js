import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import config from '../../../content/meta/config';
import menu from '../../../content/meta/menu';
import Footer from '../Footer';
import Header from '../Header';

const Layout = props => {
  const { children } = props;

  const { headerTitle, headerSubTitle } = config;

  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          footnote: markdownRemark(
            fileAbsolutePath: { regex: "/parts/footnote/" }
          ) {
            html
          }
        }
      `}
      render={data => {
        const { footnote } = data;

        return (
          <div className="layout">
            <Header title={headerTitle} subTitle={headerSubTitle} menu={menu} />
            <main>{children}</main>
            <Footer footnote={footnote} />
          </div>
        );
      }}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
