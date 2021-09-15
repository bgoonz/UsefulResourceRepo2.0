import React from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';
import Helmet from 'react-helmet';

import Header from './Header';
import favicon from '../favicon.ico';
import './Layout.css';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query userQuery {
        behanceUser {
          names {
            displayName
          }
          avatar
          place {
            location
          }
          url
          stats {
            followers
            appreciations
            views
          }
          socialMedia {
            social_id
            url
            service_name
          }
        }
      }
    `}
    render={data => (
      <React.Fragment>
        <Helmet
          title="Gatsby Source - Behance"
          meta={[
            { name: 'description', content: 'Sample Website for gatsby-source-behance' },
            { name: 'keywords', content: 'gatsby, source, behance, lekoarts' },
          ]}
        >
          <link rel="shortcut icon" href={favicon} />
        </Helmet>
        <Header user={data.behanceUser} />
        <div
          style={{
            margin: '-6rem auto 0 auto',
            maxWidth: 1200,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
            position: 'relative',
          }}
        >
          {children}
        </div>
      </React.Fragment>
    )}
  />
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.any.isRequired,
};
