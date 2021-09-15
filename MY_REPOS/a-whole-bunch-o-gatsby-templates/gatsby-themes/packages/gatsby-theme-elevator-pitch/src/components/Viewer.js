import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import StyleVars from '../styles/StyleVars';
import GlobalStyles from '../styles/GlobalStyles';
import Screens from './Screens';
import Screen from './Screen';
import Nav from './Nav';
import Social from './Social';
import Seo from './Seo';

import ChevronUpIcon from 'react-feather/dist/icons/chevron-up';
import ChevronDownIcon from 'react-feather/dist/icons/chevron-down';

const ViewerTemplate = props => {
  const navIcons = {
    next: ChevronDownIcon,
    prev: ChevronUpIcon,
  };

  const {
    data: {
      site: {
        siteMetadata: { title, url, language, image, description },
      },
      screens: { edges },
      avatar,
    },
  } = props;

  const screensData = edges.map(edge => {
    const {
      node: {
        fields: { position: id },
        html,
      },
    } = edge;

    const screen = { id: parseInt(id, 10), html };

    if (screen.id === edges.length) {
      screen.avatar = avatar.childImageSharp.fixed;
    }

    return screen;
  });

  return (
    <React.Fragment>
      <GlobalStyles />
      <StyleVars />
      <Screens
        screensData={screensData}
        navComponent={Nav}
        screenComponent={Screen}
        socialComponent={Social}
        navIcons={navIcons}
      />
      <Seo
        url={url}
        language={language}
        title={title}
        description={description}
        image={image}
      />
    </React.Fragment>
  );
};

const Viewer = () => (
  <StaticQuery
    query={graphql`
      query IndexQuery {
        site {
          siteMetadata {
            title
            url
            language
            image
            description
          }
        }
        screens: allMarkdownRemark(
          filter: {
            fields: {
              source: {
                in: ["elevator-pitch-screens", "elevator-pitch-demo-screens"]
              }
              position: { ne: null }
            }
          }
          sort: { fields: [fields___position], order: ASC }
        ) {
          edges {
            node {
              fields {
                position
                source
              }
              html
            }
          }
        }
        avatar: file(
          sourceInstanceName: {
            in: ["elevator-pitch-images", "elevator-pitch-demo-images"]
          }
          name: { eq: "avatar" }
        ) {
          childImageSharp {
            fixed(width: 132, height: 132) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => <ViewerTemplate data={data} />}
  />
);

export default Viewer;
